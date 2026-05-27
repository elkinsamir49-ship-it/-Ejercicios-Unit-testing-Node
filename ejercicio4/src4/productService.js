

class ProductService {
  constructor(productRepository) {
    this.repository = productRepository; 
  }

  async getById(id) {
    const product = await this.repository.findById(id);
    if (!product) {
      throw new Error('Producto no existe');
    }
    return product;
  }

  async getByCategory(category) {
    const allProducts = await this.repository.findAll();
    return allProducts.filter(product => product.category === category);
  }

  async searchByName(query) {
    if (!query || query.trim() === '') {
      throw new Error('Query vacía');
    }
    
    const allProducts = await this.repository.findAll();
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  async create(productData) {
    if (!productData || !productData.name || productData.price === undefined) {
      throw new Error('Datos faltantes');
    }
    
    if (productData.price <= 0) {
      throw new Error('Precio negativo o cero');
    }

    const savedProduct = await this.repository.save(productData);
    return savedProduct;
  }
}

module.exports = ProductService;