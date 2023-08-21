function Menu ({data, addCart}) {
    return(
        <ul>
            {data.map((item) => 
                <li key={item.id} style={{listStyle: "none"}} onClick={() => addCart(item)}>
                    <div className="d-flex justify-content-between border p-2 rounded">
                        <div>
                            <h4>{item.name}</h4>
                            <h6>{item.description}</h6>
                        </div>
                        <div><p>${item.price}</p></div>
                    </div>
                </li>
            )}
        </ul>
    )
}

export default Menu