# PROJECT INIT
 1. Frontend: Nextjs 
 2. Backend: Nestjs

 # INIT PROJECT
## 1. Nail version package
 Nail các version package trong package.json để tránh lỗi

## 2. Chọn tailwindCSS và flowbite-react to build component UI lib
 - Dùng [Flowbite-react](https://flowbite-react.com/docs/guides/next-js)

 ```bash
 $ npm i flowbite-react
 $ npm i -D tailwindcss postcss autoprefixer
 ```

  - [Editor setting cho tailwind-css](https://flowbite-react.com/docs/getting-started/editor-setup)

## 3. Sử dụng chartjs để render chart
 
 - Sử dụng [recharts](https://recharts.org/en-US/guide) để render chart
 
 ```bash
 $ npm install --save recharts @types/recharts
 ```

## 4. Sử dụng [next-auth](https://authjs.dev/getting-started/installation?framework=Next.js) để thực hiện việc xác thực

```bash
$ npm i --save-exact next-auth@5.0.0-beta.22

# Cài đặt auth secret
$ npx auth secret
```

## 5. Sử dụng node-fetch để fetch API 

```bash
$ npm i --save-exact node-fetch@3.3.2
```

