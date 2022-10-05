import { useContext } from "react";
import { BidangBelanjaContext } from "src/context/BidangBelanjaContext";
import Link from "next/link";
import moment from 'moment';
const Index = () => {
    const bidangBelanjaState = useContext(BidangBelanjaContext); 
   
    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
           <Link href="/admin/bidang_belanja/add">
                <button className="bg-blue-600 rounded-md p-1 mb-1 text-white font-bold">Tambah</button>
            </Link>
            <h4 className="text-black text-1xl justify-center"> Data Bidang Belanja</h4>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            No
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Bidang
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Ditambah Oleh
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Ditambah
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Diupdate
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {bidangBelanjaState.bidangBelanja.map((item, index) => (
                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={index}>
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {index +1}
                            </th>
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.bidang}
                            </th>
                            <td className="py-4 px-6">
                                {item.user_created}
                            </td>
                            <td className="py-4 px-6">
                                {moment(item.created_at).format('DD/MM/YYYY HH:mm')}
                            </td>
                            <td className="py-4 px-6">
                                {item.updated_at?  moment(item.updated_at).format('DD/MM/YYYY HH:mm') : 'Belum pernah diupdate'}
                            </td>
                            <td className="py-4 px-6">
                            <Link href={`/admin/bidang_belanja/${item.id}`}>
                                <a href="#" className="bg-indigo-700 text-white p-1 rounded-md font-bold mr-1">Edit</a>
                            </Link>
                                <a href="#" className="bg-red-700 text-white p-1 rounded-md font-bold" onClick={(e) => bidangBelanjaState.handleDelete(e)} id={item.id}>Delete</a>
                            </td>
                        </tr>
                    ))}
                   
                </tbody>
            </table>
        </div>
    )
}
export default Index