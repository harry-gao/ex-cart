```
#to test whether the ProductImage Uploader is working
p = %Nectar.ProductImage{product_id: 1}
Nectar.Uploader.ProductImage.store("/Users/xxx/Downloads/apple.jpeg", p})
```

Create React App use service worker to cache files for offline scenario, so when acceess /admin, react router will intercept the url, hence not work correctly. Work around is to disable service worker in chrome dev console.

A product need at least one image otherwise no thumbnail and js will crash