import React,{useEffect,useState} from 'react';
import axios from 'axios';
import './product.css'
import Banner from './Banner'
import { BrowserRouter as Router, Switch, Route , Link } from 'react-router-dom';
import AddNewItem from './AddNewItem'
import ToastComponent from './ToastComponent';



function ProductList(){
    const [ counter , setCounter ] = useState(0)
    const [ product, setProducts] = useState([])
   const [addNew, setAddNew] = useState(false)
   const [newitem, setNewItem ] = useState([])
   const [ mode, setMode] = useState("")
   const [ modifyPrd, setModifyPrd] = useState(0)

   const [ toastmsg, setToastmsg] = useState("Product selected Successfully")
  
 let match_index ;
 
    useEffect(() => {
        getData();

   

     },[counter])
     async function getData (){
        const request1 = await axios.get(`https://fakestoreapi.com/products/`);
        console.table(request1.data)
        setProducts(request1.data)
    return request1

    }
    const addNew_nav = () =>{
        setAddNew(true)
        setMode("add")
        setModifyPrd(null)
    }
   


    const callback = (list,error) => {

        console.log(list)
        if(!error){
            if(!userExists(list.id)){


                setProducts(product => [...product , list])
               
                setToastmsg("New Product Added Successfully")
                toastActions()
            }else{
             
                product[match_index].title = list.title;
                product[match_index ].description = list.description;
                product[match_index].price = list.price;
                product[match_index ].category = list.category;
                product[match_index ].id = list.id;
                product[match_index ].category = list.category;
                product[match_index ].image = list.image;
                product[match_index ].rating.rate = list.rating.rate
                product[match_index ].rating.count = list.rating.count
                setProducts(product)
               
                setToastmsg("Product Modified Successfully")
                toastActions()
            }
            console.log(match_index)
    
            setAddNew(false)
        }
      
        // product.map()
    }

    const userExists = (id) => {
        return product.some(function(el,i) {
           
            if(el.id == id){
                match_index = i
            }
          return el.id == id;
        }); 
      }

    const editData = (e) => {
        setAddNew(true)
        setMode("modify")
        setModifyPrd(e.target.closest('tr').getAttribute("id"))
    
    }

    const deleteData = (e) => {

        product.splice([e.target.closest('tr').getAttribute("id") - 1],1);
        e.target.closest('tr').remove()
        setProducts(product)

        setToastmsg("Product deleted Successfully")
        toastActions()
      
    }

    // close toastmsg
    const toastActions = () =>{
        document.getElementById("service-created").style.marginBottom = '0px'
  
        setTimeout(function(){
         
            document.getElementById("service-created").style.marginBottom = '-55px'
        },2000)
    }
    const searchProducts = (e) => {
        let prds_list = product;
        
        if(e.target.value.length == 0){
            getData();
        }else{
            const result = prds_list.filter(x => x.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
   
            setProducts(result)
        }
       
    }

   

    return (
        <div className="">
        <Banner />
     

 <div>
   
            
            {addNew == false ? 
             <div className="m-20">
             <button className="btn-primary mb-20" onClick={addNew_nav}>Add New</button>
            <div className="float-right">
                <input type="text" placeholder="Search..." className="form-control w-250 serach_height" onKeyUp={e => searchProducts(e)} />
            </div>
             <div className="clear">
                 <table className="table-border" width="100%">
                     <thead>
                         <tr>
                             <th width="5%"><input type="checkbox" className="check-box" /></th>
                             <th width="30%" >Name</th>
                             <th  width="10%">Category</th>
                             <th  width="30%">Description</th>
                             <th  width="10%">Price</th>
                             <th width="10%"> &nbsp;</th>
                         </tr>
                     </thead>
                     <tbody>
                     {product.length == 0 ? 
                         <tr >
                             <td colspan = "6">

                             
                            <div className="maintaince-message">
                             <div className="message"> 
                             <svg width="49" height="51" xmlns="http://www.w3.org/2000/svg"><path d="M3.9468 10.0288L20.5548.995c2.4433-1.3267 5.45-1.3267 7.8936 0l16.6078 9.0338C47.4966 11.3585 49 13.8102 49 16.4666V34.534c0 2.6537-1.5034 5.1082-3.9438 6.438l-16.6078 9.0307c-2.4435 1.3297-5.4503 1.3297-7.8937 0L3.9467 40.972C1.5035 39.642 0 37.1876 0 34.534V16.4667c0-2.6564 1.5034-5.108 3.9468-6.4378z" class="app-icon" ></path></svg>
                              <div class="message__title"> Offline for maintenance </div>
                               <p> This app is undergoing maintenance right now. </p> <p> Please check back later. </p> </div>
                         </div> 
                         </td>
                         </tr>
                         
                         : 
                         product.map((x) => (
                            <tr id={x.id}>
                                <td><input type="checkbox" className="check-box" /></td>
                                <td>{x.title}</td>
                                <td>{x.category}</td>
                                <td ><p className="description">{x.description}</p></td>
                                <td>{x.price}</td>
                                <td>
                                    <a className="mr-10" onClick={e => editData(e)}><i className="icon16 di-block icon-edit"></i></a>
                                    <a onClick={e => deleteData(e)} ><i className="icon16 di-block icon-delete"></i></a>
                                </td>
                            </tr>
                        ))
                     }
                     </tbody>
                     
                     
                 </table>
             </div>
         </div>
        
            :
            <div className="m-20">

                 <AddNewItem parentCallback={callback} type={mode} prod_id = {modifyPrd} prd_list = {product} />

                </div>
            
            }
          
           <div>
               <ToastComponent toast_txt = {toastmsg}/>
           </div>
            </div>  
           
      


           
        </div>
       
    )
}
export default ProductList