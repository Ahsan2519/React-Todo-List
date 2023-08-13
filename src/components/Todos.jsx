import React from 'react'

const Todos = ()=> {
  const submitEvent = (e)=>{
    e.preventDefault();
  }
  const todosHandler = (e)=>{ 
    if (e.key === 'Enter') {
      console.log(e.target.value);
    }
  }

  return (
   <div className ='w-[70%] mx-auto bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
     <form onSubmit={submitEvent }>
      <div>
        <input type="text" placeholder='What needs to be done?' name='search' className='common outline-none' onKeyDown={todosHandler} />
      </div>
    </form>
    <div>
        <ul>
            <li className='common relative icon completed'>ashjvgf jgczxf</li>
        </ul>
        <div className='flex justify-between px-[15px] items-center'>
            <span>1 item left</span>
            <ul className='flex justify-between py-3 basis-[45%] text-black gap-2'>
                <li className='basis-[20%] border-[1px] border-[#EFD5D5] block text-center'>All</li>
                <li className='basis-[38%] block text-center'>Active</li>
                <li className='basis-[38%] block text-center'>Completed</li>
            </ul>
            <button>Clear completed</button>
        </div>
    </div>
   </div>
  )
}
export default Todos