```
#to test whether the ProductImage Uploader is working
p = %Nectar.ProductImage{product_id: 1}
Nectar.Uploader.ProductImage.store("/Users/harry/Downloads/apple.jpeg", p})
```