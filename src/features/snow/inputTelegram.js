import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useSaveSnowDataQuery } from '../api/apiSlice'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

let section0 = ''   
const regexS1 = /^(1[0-9/]{4})? ?(2[0-9/]{4})? ?(3[0-9/]{3}[0-4/])? ?(4[0-9/]{4})? ?(5[0-9/]{4})? ?(6[0-9/]{3}[0-4/])? ?(7[0-3][0-9][01][0-9])? ?(8[0-3][0-9][01][0-9])? ?(9[0-3][0-9][01][0-9])? ?(0[0-3][0-9][01][0-9])? ?(7[0-3][0-9][01][0-9])? ?(9[0-3][0-9][01][0-9])? ?(7[0-3][0-9][01][0-9])? ?(9[0-3][0-9][01][0-9])?$/
let showResponse = false                                                                                                                                                                      
const today = new Date()
export const InputSnowTelegram = ({currentUrl})=>{
  const [snowData, setSnowData] = useState(null)                                                                                                                                                                 
  const {                                                                                                                                                                                                            
    data: response = {},                                                                                                                                                                                             
    isSuccess,
  } = useSaveSnowDataQuery(snowData)
  const [section1, setSection1] = useState('')
  const [observDate, setObservDate] = useState(today.toISOString().slice(0,10))                                                                                                               
  const pointCode = (currentUrl.indexOf('pointCode')>-1)? currentUrl.slice(-5):'99999'
  const observationDate = observDate.slice(8,10)+observDate.slice(5,7)+observDate[3]
  section0 = `${observationDate} ${pointCode}`
  
  const dateChanged = e=>{
    setObservDate(e.target.value)
  }
  const {
    // register,
    // control,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm({})
  const onSubmit = () => {
    if(section1.length>4 && regexS1.test(section1)){
      let snowData = {
        telegram: `${section0} ${section1}=`,
        pointCode,
        reportDate: observDate
      }
      setSnowData(snowData)
      console.log(snowData)
      showResponse = true
      setSection1('')
    }else{
      alert('Error!')
    }
  }
  const section1Changed = e =>{
    setSection1(e.target.value)
  }
  if(showResponse && isSuccess && response.response){ // .failed_count==="0") && (response.response.success_count !== '0')){
    // {"response":{"success_count":"3","failed_count":"0","detail_message":null,"@xmlns:tns":"urn:CSDNIntf-ICSDN"}}
    let csdnResponse = response.response.failed_count==='0'? 'В ЦСДН сохранены данные.':'Ошибка при сохранении данных.'
    showResponse = false
    alert(csdnResponse) //, JSON.stringify(response))
  }
  return (                                                                                                                                                                                      
    <main className="flex min-h-screen flex-col p-6">
      <p><b>Дата наблюдения</b></p>
      <input id="observ-date" type='date' value={observDate} onChange={(e)=> dateChanged(e)} className="peer block text-gray-800 w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 "/>
      <p><b>Телеграмма</b></p>
      <p>{section0} {section1}</p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" >
          <Form.Label>Раздел 1</Form.Label>
          <Form.Control width='300px' type="text" value={section1} onChange={section1Changed} style={{ width: '480px', top: '60px',left: '10px'}} placeholder="1sssK 2ddll 3RRRE 4sssK 5ddLL 6RRRE 7YYMM 8YYMM 9YYMM 0YYMM"/>
        </Form.Group>
        =
        <br/>
        <Button type="submit">Сохранить</Button>                                                                                                                                                  
      </Form>
    </main>
  )
}