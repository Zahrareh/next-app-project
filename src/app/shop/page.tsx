import { revalidateTag } from "next/cache";

interface IProduct {
  id: number;
  title: string;
  price: number;
}

async function Shop() {
    const response = await fetch("http://localhost:8000/products",{
        cache: 'no-cache',
        next:{
            tags:['products'],
        }
    })
    const products:IProduct[] = await response.json()
//FormData is an interface ...
    async function addProduct(e:FormData) {
        'use server'
        const title=  e.get('title')
        const price = e.get('price')
        const newProduct = {title:title,price:price}

        await fetch("http://localhost:8000/products",{
            method: 'POST',
            body:JSON.stringify(newProduct),
            headers:{
                'Content-Type':'application/json'
            }
        })

        revalidateTag('products')
    }
  return (
    <>
      <div>
        <form
          action={addProduct}
          className="flex flex-col gap-5 max-w-xl p-8 mx-auto bg-slate-800 rounded-md"
        >
          <input
            type="text"
            name="title"
            placeholder="title"
            className="p-2 bg-slate-600 outline-none rounded-md"
          />
          <input
            type="text"
            name="price"
            placeholder="price"
            className="p-2 bg-slate-600 outline-none rounded-md"
          />
          <button className="p-2 bg-slate-900 text-slate-100 rounded-md">
            Add Product
          </button>
        </form>
      </div>
      <div className="flex flex-wrap justify-center max-w-xl mx-auto my-10 gap-5">
        
            {products.map((item)=>(
                <div key={item.id} className="p-5 bg-slate-800 rounded-md text-center text-white ">
                    <p>{item.title}</p>
                    <p>{item.price}</p>
                </div>
                ))}
        
      </div>
    </>
  );
}
export default Shop;
