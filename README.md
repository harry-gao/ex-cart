```
#to test whether the ProductImage Uploader is working
p = %Nectar.ProductImage{product_id: 1}
Nectar.Uploader.ProductImage.store("/Users/xxx/Downloads/apple.jpeg", p})
```