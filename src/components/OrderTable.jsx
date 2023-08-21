function OrderTable ({index, item}) {
    return(
        <tr key={index}>
            <td scope="col">{item.name}</td>
            <td scope="col">{item.count}</td>
            <td scope="col">${item.count * item.price}</td>
        </tr> 
    )
}
export default OrderTable