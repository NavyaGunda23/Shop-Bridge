import React from 'react'
import './toastComponent.css'

function ToastComponent({toast_txt}){
    return(
        <div>
        <div id="service-created" ><div className="ml-65"><i className="icon32 icon-success-message di-block v-middle mr-10"></i>{toast_txt}<button type="button" className="close" data-dismiss="alert">×</button></div> </div>
        </div>
    )
}
export default ToastComponent