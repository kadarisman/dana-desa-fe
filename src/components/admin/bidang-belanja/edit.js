import {useEffect, useContext} from "react";
import { BidangBelanjaContext } from "src/context/BidangBelanjaContext";
import { useRouter } from 'next/router'
import Link from 'next/link';
const Edit = () => {
    const bidangBelanjaState = useContext(BidangBelanjaContext); 
    const router = useRouter()
    const { id } = router.query;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        bidangBelanjaState.setValues({...bidangBelanjaState.values, [name]: value, });             
    } 

    useEffect(() => {
        (async () => {
            const getData = await fetch('http://localhost:9001/bidang-belanja/'+id);
            const data = await getData.json();
            bidangBelanjaState.setValues({bidang: data.data.bidang})
            bidangBelanjaState.setId(id);
            }
        )()
       
    }, [bidangBelanjaState.setValues, bidangBelanjaState.pendapatanById]);


    return (
        <div className="container mx-auto w-1/2">
            <h4 className="text-black font-bold text-center text-2xl mb-2">Form Edit Pendapatan</h4>
            <form className="bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={bidangBelanjaState.handleEdit}>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="nama">
                        Jumlah
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bidang" type="text" placeholder="Bidang" name="bidang"  value={bidangBelanjaState.values.bidang} onChange={ handleInputChange}/>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Simpan
                    </button>
                    <Link href="/admin/bidang_belanja">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Kembali
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    )
}
export default Edit