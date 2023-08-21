function CartTable({index, cart, changeCartCount, deleteCart}) {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return(
        <tr key={index}>
            <td>{cart.name}</td>
            <td><small>{cart.description}</small></td>
            <td>${cart.price}</td>
            <td>
                <select name="count" id="count" value={cart.count} onChange={(e) => changeCartCount(cart.id, e.target.value)} className="form-select-sm">
                    {nums.map((num) => 
                        <option key={num} value={num}>{num}</option>
                    )}
                </select>
            </td>
            <td><button className="btn btn-outline-danger" onClick={() => deleteCart(index)}>x</button></td>
        </tr>
    )
}

export default CartTable