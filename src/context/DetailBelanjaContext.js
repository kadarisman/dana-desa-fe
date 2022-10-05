import { createContext, useState, useEffect } from "react";
import {useRouter} from 'next/router'
import FormatDate from "src/helpers/formatDate";
export const DetailBelanjaContext = createContext();
const initialValues = {
    id_bidang: "",
    jumlah: "",
    tanggal: ""
  };
export const DetailBelanjaProvider = (props) => {
    const [values, setValues] = useState(initialValues);
    const [detailBelanja, setDetailBelanja] = useState([]);    
    const [detailBelanjaById, setDetailBelanjaById] = useState({});
    const [Id, setId] = useState({});
    const router = useRouter()    
    const [bidangBelanja, setBidangBelanja] = useState([]);  

    useEffect(() => {
        (async () => {
            const getData = await fetch(`http://localhost:9001/detail-belanja`);
            const data = await getData.json();
            setDetailBelanja(data.data);

            const getDataBidang = await fetch(`http://localhost:9001/bidang-belanja`);
            const dataBidang = await getDataBidang.json();
            setBidangBelanja(dataBidang.data);

            }
        )()
    }, []); 

    const handleInput = async (e) => {
        e.preventDefault();
        const Data = {id_bidang: values.id_bidang, jumlah: values.jumlah, tanggal: values.tanggal};
        const res = await fetch('http://localhost:9001/detail-belanja', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data),
          });
          console.log(res.status);
          router.push("/admin/detail_belanja")
    }   

    const handleEdit = async (e) =>{
        e.preventDefault();
        const dataEdit = {id_bidang: values.id_bidang, jumlah: values.jumlah, tanggal: values.tanggal};
        const res = await fetch(`http://localhost:9001/detail-belanja/${Id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataEdit),
          });
          router.push("/admin/detail_belanja")
    }

    const handleDelete = async (e) =>{
          const id = e.target.id;
          const confirmDelete = confirm("yakin mau hapus ?");
          if (confirmDelete) {
            const res = await fetch(`http://localhost:9001/detail-belanja/${id}`, {
                method: 'DELETE',
              });
            const newData = await fetch(`http://localhost:9001/detail-belanja`);
            const dataNew = await newData.json();
            setDetailBelanja(dataNew.data);
            router.push("/admin/detail_belanja")
          }
    }

    const detailBelanjaState = {
        detailBelanja,
        setDetailBelanja,
        handleInput,
        values,
        setValues,
        detailBelanjaById,
        setDetailBelanjaById,
        handleEdit,
        Id,
        setId,
        handleDelete,
        bidangBelanja
    };

    return(
        <DetailBelanjaContext.Provider value={detailBelanjaState}>
            {props.children}
        </DetailBelanjaContext.Provider>
    )
}