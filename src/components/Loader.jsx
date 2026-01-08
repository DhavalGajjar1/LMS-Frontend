import React from "react";

const Loader=()=>{
    return(
        <div style={{display:'flex',jstifycontent:'center',alignitem:'center'}}>
            <div className="loader">Loading....</div>
            <style>{`
                .loader{
                    border:16px solid #f3f3f3;
                    border-top:16px solid #3498db;
                    border-radius:50%;
                    width:120px;
                    height:120px;
                    animation:spin 2s linear infinite;
                }
                    @keyframe spin{
                        0%{transform:rotate(0deg);}
                        100%{transform:rotate(360deg);}
                    }
            `}</style>
        </div>
    )
}
export default Loader