import React, { useEffect,useRef, useState } from 'react';
import './addnewitem.css'


function AddNewItem({parentCallback,type, prod_id, prd_list}){
    const prd_id = useRef(null)
    const prd_name = useRef(null)
    const prd_desc = useRef(null)
    const prd_price = useRef(null)
    const prd_cat = useRef(null)
    const prd_rating = useRef(null)
    const prd_rating_cnt = useRef(null)

    const [newitem, setNewItem ] = useState([])
useEffect(() => {
    if(type == "modify"){
        var prdict_row ;
        prd_list.some(function(el,i) {
            // match_index = el
            if(el.id == prod_id){
                prdict_row =  i
            }
        //   return (el.id == prod_id ? i : '');
        }); 
        
        // console.log(prd_list[prod_id - 1])
        prd_id.current.value = prd_list[prdict_row].id;
        prd_name.current.value = prd_list[prdict_row].title;
        prd_desc.current.value = prd_list[prdict_row].description
        prd_price.current.value = prd_list[prdict_row].price;
        prd_cat.current.value = prd_list[prdict_row].category;
        prd_rating.current.value = prd_list[prdict_row].rating.rate
        prd_rating_cnt.current.value = prd_list[prdict_row].rating.count
    }
})


    const addItemRow = () => {
        var error = false;
        var list = {
            id:prd_id.current.value,
            title:prd_name.current.value,
            description:prd_desc.current.value,
            price:prd_price.current.value,
            category:prd_cat.current.value,
            image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating:{
                rate:prd_rating.current.value,
                count:prd_rating_cnt.current.value
            }
        }
        console.log(list)
        errorVaidation()
       if(prd_id.current.value == "" || prd_name.current.value  == "" || prd_desc.current.value  == "" || prd_price.current.value  == "" ||prd_cat.current.value  == "" ||prd_rating.current.value  == "" ||prd_rating_cnt.current.value  == "" ){
        error = true
       }
        parentCallback(list,error)

    }

    const errorVaidation = () => {
        [...document.querySelectorAll(".form-control")].map(x => {
            if(x.value.length == 0){
                x.closest(".form-group").classList.add("has-error");
                x.closest(".form-group").querySelector(".error-field").innerText = `Please enter ${x.closest(".form-group").querySelector("label").innerText}`
            }else{
                x.closest(".form-group").classList.remove("has-error");
                x.closest(".form-group").querySelector(".error-field").innerText = ``
            }
        })
    }

    const inputValidation = (e,ref_id) => {
        if(ref_id.current.value.length == 0){
            e.target.closest(".form-group").classList.add("has-error");
            e.target.closest(".form-group").querySelector(".error-field").innerText = `Please enter ${e.target.closest(".form-group").querySelector("label").innerText}`
        }else{
            e.target.closest(".form-group").classList.remove("has-error");
            e.target.closest(".form-group").querySelector(".error-field").innerText = ``
        }
    }

    return (


        <div className="row">
             <div className="form-group">
                <label>Product Id:</label>
                <input type="number" className="form-control" onKeyUp={e => inputValidation(e,prd_id)}  ref={prd_id}/>
                <div class="error-field "></div>
            </div>

            <div className="form-group">
                <label>Product Name:</label>
                <input type="text" className="form-control" onKeyUp={e => inputValidation(e,prd_id)} ref={prd_name}/>
                <div class="error-field "></div>
            </div>
           
            <div className="form-group">
                <label>Product Description:</label>
                <input type="text"  className="form-control" onKeyUp={e => inputValidation(e,prd_id)} ref={prd_desc}/>
                <div class="error-field "></div>
            </div>
            <div className="form-group">
                <label>Price</label>
                <input type="number" className="form-control" onKeyUp={e => inputValidation(e,prd_id)} ref={prd_price}/>
                <div class="error-field "></div>
            </div>
            <div className="form-group">
                <label>Category</label>
                <select  ref={prd_cat} >
                    <option value="men's clothing">Mens Clothing</option>
                    <option value="jewelery">Jwelery</option>
                    <option value="electronics">Electronics</option>
                    <option value="women's clothing">Womens Clothing</option>
                </select>
            </div>
            <div className="form-group">
                <label>Rating Rate</label>
                <input type="number" className="form-control" onKeyUp={e => inputValidation(e,prd_id)} ref={prd_rating}/>
                <div class="error-field "></div>
            </div>
            <div className="form-group">
                <label>Rating Count</label>
                <input type="number" className="form-control" onKeyUp={e => inputValidation(e,prd_id)} ref={prd_rating_cnt}/>
                <div class="error-field "></div>
            </div>
          <button onClick = {addItemRow}>Save</button>

        </div>
    )
}

export default AddNewItem