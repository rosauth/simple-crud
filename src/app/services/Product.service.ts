import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Product } from '../constants/product'

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    private URL = 'https://5d60ae24c2ca490014b27087.mockapi.io/api/v1/items';

    constructor (private http: HttpClient){}

    getItem(){
        return this.http.get<Product[]>(`${this.URL}`);
    }

    getItemById(productId: String){
        return this.http.get<Product>(`${this.URL}/${productId}`);
    }

    updateItem(product: Product){
        return this.http.put(`${this.URL}/${product.id}`, product);
    }

    deleteItem(productId: String){
        return this.http.delete(`${this.URL}/${productId}`);
    }

    createItem(product: Product){
        return this.http.post(`${this.URL}`, product)
    }
}