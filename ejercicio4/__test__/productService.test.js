const ProductService = require('../src4/productService');
const mockRepo = {
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
};

describe('ProductService', () => {
  let service;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ProductService(mockRepo);
  });

  describe('getById()', () => {
    it('debe encontrar un producto correctamente si el ID existe', async () => {
      const mockProduct = { id: 1, name: 'Camiseta Oversize', price: 45000, category: 'Ropa' };
      mockRepo.findById.mockResolvedValue(mockProduct);

      const result = await service.getById(1);

      expect(result).toEqual(mockProduct);
      expect(mockRepo.findById).toHaveBeenCalledWith(1);
      expect(mockRepo.findById).toHaveBeenCalledTimes(1);
    });

    it('debe lanzar un error si el producto no es encontrado', async () => {
      mockRepo.findById.mockResolvedValue(null);

      await expect(service.getById(99)).rejects.toThrow('Producto no existe');
      expect(mockRepo.findById).toHaveBeenCalledWith(99);
    });
  });

  describe('getByCategory()', () => {
    it('debe devolver solo los productos de la categoría especificada', async () => {
      const mockProducts = [
        { id: 1, name: 'Camiseta', category: 'Ropa' },
        { id: 2, name: 'Zapatos', category: 'Calzado' },
        { id: 3, name: 'Buso', category: 'Ropa' },
      ];
      mockRepo.findAll.mockResolvedValue(mockProducts);

      const result = await service.getByCategory('Ropa');

      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { id: 1, name: 'Camiseta', category: 'Ropa' },
        { id: 3, name: 'Buso', category: 'Ropa' },
      ]);
    });

    it('debe devolver un array vacío si la categoría no contiene productos', async () => {
      mockRepo.findAll.mockResolvedValue([]);

      const result = await service.getByCategory('Accesorios');

      expect(result).toEqual([]);
    });
  });

  describe('searchByName()', () => {
    it('debe realizar una búsqueda exitosa de forma case-insensitive', async () => {
      const mockProducts = [
        { id: 1, name: 'Camiseta OVERSIZE' },
        { id: 2, name: 'Pantalón Jean' },
        { id: 3, name: 'Buso oversize' },
      ];
      mockRepo.findAll.mockResolvedValue(mockProducts);

      const result = await service.searchByName('oVeR');

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Camiseta OVERSIZE');
      expect(result[1].name).toBe('Buso oversize');
    });

    it('debe lanzar un error si la query está vacía o son solo espacios', async () => {
      await expect(service.searchByName('')).rejects.toThrow('Query vacía');
      await expect(service.searchByName('   ')).rejects.toThrow('Query vacía');
    });
  });

  describe('create()', () => {
    it('debe guardar un producto válido, llamar a save() una sola vez y retornar el producto guardado', async () => {
      const validProductData = { name: 'Gorra Trend', price: 25000, category: 'Accesorios' };
      const expectedSavedProduct = { id: 10, ...validProductData };
      
      mockRepo.save.mockResolvedValue(expectedSavedProduct);

      const result = await service.create(validProductData);
      expect(result).toEqual(expectedSavedProduct);
      expect(mockRepo.save).toHaveBeenCalledTimes(1);
      expect(mockRepo.save).toHaveBeenCalledWith(validProductData);
    });

    it('debe lanzar un error si el precio es negativo o cero y NO llamar a save()', async () => {
      const invalidProduct = { name: 'Medias', price: -500 };
      
      await expect(service.create(invalidProduct)).rejects.toThrow();
      expect(mockRepo.save).not.toHaveBeenCalled();
    });

    it('debe lanzar un error si falta el nombre o datos obligatorios', async () => {
      const missingNameProduct = { price: 20000 };
      
      await expect(service.create(missingNameProduct)).rejects.toThrow('Datos faltantes');
      expect(mockRepo.save).not.toHaveBeenCalled();
    });
  });
});