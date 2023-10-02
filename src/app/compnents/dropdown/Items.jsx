/* eslint-disable @next/next/no-img-element */

function Items({data , onClick}) {


  return (
    <div className="flex items-center gap-3 bg-slate-200 my-2 py-2 px-3"  onClick={onClick} >
      <div>
        <img src={data?.img} alt="token image" width={20} height={20} />
      </div>
      <div>
        <p className="text-[10px]">{data?.ticker}</p>
        <p className="text-[9px]">{data?.name}</p>
      </div>
    </div>
  );
}

export default Items;
