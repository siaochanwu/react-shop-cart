import 'bootstrap/scss/bootstrap.scss'
import { useEffect, useState } from 'react';
import CartTable from './components/CartTable';
import Menu from './components/Menu';
import OrderTable from './components/OrderTable';
const data = [
  {
    "id": 1,
    "name": "珍珠奶茶",
    "description": "香濃奶茶搭配QQ珍珠",
    "price": 50
  },
  {
    "id": 2,
    "name": "冬瓜檸檬",
    "description": "清新冬瓜配上新鮮檸檬",
    "price": 45
  },
  {
    "id": 3,
    "name": "翡翠檸檬",
    "description": "綠茶與檸檬的完美結合",
    "price": 55
  },
  {
    "id": 4,
    "name": "四季春茶",
    "description": "香醇四季春茶，回甘無比",
    "price": 45
  },
  {
    "id": 5,
    "name": "阿薩姆奶茶",
    "description": "阿薩姆紅茶搭配香醇鮮奶",
    "price": 50
  },
  {
    "id": 6,
    "name": "檸檬冰茶",
    "description": "檸檬與冰茶的清新組合",
    "price": 45
  },
  {
    "id": 7,
    "name": "芒果綠茶",
    "description": "芒果與綠茶的獨特風味",
    "price": 55
  },
  {
    "id": 8,
    "name": "抹茶拿鐵",
    "description": "抹茶與鮮奶的絕配",
    "price": 60
  }
]


function App() {
  const [carts, setCarts] = useState([])
  const [total, setTotal] = useState(0)
  const [memo, setMemo] = useState("")
  const [order, setOrder] = useState({data: [], total: 0, memo: ""})

  useEffect(() => {
    setTotal(carts.reduce((pre, curr) => pre + curr.price * curr.count, 0))
  }, [carts])

  const addCart = (cart) => {
    let exist = false
    
    carts.map((item) => {
        if (item.id == cart.id){
            exist = true
            item.count ++
        }
    })
    return exist ? setCarts([...carts]): setCarts([...carts, {...cart, count: 1}])
  }

  const changeCartCount = (id, newNum) => {
    setCarts(carts.map((item) => item.id == id ? {...item, count: parseInt(newNum)} : item))
    console.log(carts)
  }

  const deleteCart = (id) => {
    setCarts(carts.filter((item, index) => index !== id ))
  }

  const addMemo = (e) => {
    setMemo(e.target.value)
    // console.log(memo)
  }

  const submitOrder = () => {
    if(carts.length == 0) {
        return
    }
    //購物車有商品
    setOrder({data: carts, total, memo})
    console.log('order', order)

    //clear carts
    setCarts([])
    setTotal(0)
    setMemo("")
  }


  return (
    <div className="container mt-5">
        <div class="row">
            <div class="col-4">
                <Menu data={data} addCart={addCart} />
            </div>
            <div class="col-8">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">品項</th>
                            <th scope="col">描述</th>
                            <th scope="col">價格</th>
                            <th scope="col">數量</th>
                            <th scope="col">刪除</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.length == 0 ?  <tr>
                            <td colSpan="5">
                                <div className="alert alert-primary">請選擇商品</div>
                                </td>
                            </tr> : 
                        carts.map((cart, index) => 
                            <CartTable key={index} cart={cart} index={index} changeCartCount={changeCartCount} deleteCart={deleteCart} />
                            )
                        }
                    </tbody>
                </table>
                {carts.length == 0 ? "" : 
                    <div>
                        <h5 className="text-end">Total: ${total}</h5>
                        <textarea className="border border-1" name="memo" id="memo" cols="70" rows="5" onChange={(e) => addMemo(e)}></textarea>
                        <div className="text-end">
                            <button className="btn btn-primary" onClick={submitOrder}>送出</button>
                        </div>
                    </div>
                }
            </div>
        </div>
        <hr />
        <div className="row justify-content-center">
            {order.data.length == 0 ? <div className="alert alert-secondary col-8">請選擇商品</div> :
                <div className="col-8 border border-1 p-2 mb-5">
                    <h3>訂單</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">品項</th>
                                <th scope="col">數量</th>
                                <th scope="col">小計</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.data.map((item, index) => 
                                <OrderTable key={index} item={item} />
                            )}
                        </tbody>
                    </table>
                    <div className="text-end">
                        <p>備註: {order.memo}</p>
                        <h3>Total: ${order.total}</h3>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default App;