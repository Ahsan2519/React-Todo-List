import '../assets/App.css';
import Todos from './Todos';

const App = ()=> {
  return (
    <div className="max-w-[1366px] md:w-[60%] 2xl:w-[40%] mx-auto my-[10%] pt-2 pb-[100px]">
      <h1 className='text-[#B83F45] text-[60px] text-center  font-[600] mb-5'>todos</h1>
      <Todos />
    </div>
  );
}

export default App;
