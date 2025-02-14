import { useForm } from "react-hook-form"
import { useSaveSnowDataQuery } from '../api/apiSlice'
import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const today = new Date()
let section0 = ''
let showResponse = false
const regexS1 = /^(1[0-9/]{4})? ?(2[0-9/]{4})? ?(3[0-9/]{3}[0-4/])? ?(4[0-9/]{4})? ?(5[0-9/]{4})? ?(6[0-9/]{3}[0-4/])? ?(7[0-3][0-9][01][0-9])? ?(8[0-3][0-9][01][0-9])? ?(9[0-3][0-9][01][0-9])? ?(0[0-3][0-9][01][0-9])? ?(7[0-3][0-9][01][0-9])? ?(9[0-3][0-9][01][0-9])? ?(7[0-3][0-9][01][0-9])? ?(9[0-3][0-9][01][0-9])?$/
export const SnowReactForm = ({pointCode})=> {
  const [snowData, setSnowData] = useState(null)
  const {                                                                                                                                                                                                            
    data: response = {},                                                                                                                                                                                             
    isSuccess,
  } = useSaveSnowDataQuery(snowData)
  const [section1, setSection1] = useState('')
  const [observDate, setObservDate] = useState(today.toISOString().slice(0,10))                                                                                                               
  const observationDate = observDate.slice(8,10)+observDate.slice(5,7)+observDate[3]
  section0 = `${observationDate} ${pointCode}`
  
  const dateChanged = e=>{
    setObservDate(e.target.value)
  }
  const section1Changed = e=>{
    setSection1(e.target.value)
  }
  const { register, handleSubmit, reset,
    formState,
    formState: { isSubmitSuccessful }} = useForm({
    defaultValues: {
      section1,
      observDate,
    },
  })
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setObservDate(today.toISOString().slice(0,10))
      setSection1('')
      reset({ section1: "", observDate: today.toISOString().slice(0,10) })
    }
  }, [formState, reset])
  const onSubmit = data => {
    let s1 = data['section1']
    if(s1.length>4 && regexS1.test(s1)){
      let snowData = {
        telegram: `${section0} ${s1}=`,
        pointCode,
        reportDate: data['observDate']
      }
      setSnowData(snowData)
      console.log(snowData)
      showResponse = true
    }else{
      alert('Error!')
    }
  }
  if(showResponse && isSuccess && response.response){ // .failed_count==="0") && (response.response.success_count !== '0')){
    // {"response":{"success_count":"3","failed_count":"0","detail_message":null,"@xmlns:tns":"urn:CSDNIntf-ICSDN"}}
    let csdnResponse = response.response.failed_count==='0'? 'В ЦСДН сохранены данные.':'Ошибка при сохранении данных.'
    showResponse = false
    alert(csdnResponse)
  }
  return (
    <main style={{marginLeft: '10px'}} >
    <p><b>Телеграмма</b></p>
    <p>{section0} {section1}=</p>

    <form onSubmit={handleSubmit(onSubmit)}>
    <Form.Group className="mb-3" >
      <Form.Label className="ml-10">Дата наблюдения</Form.Label>
      <br/>      
      <input
        type="date" name="observDate"
        {...register("observDate", { required: true })}
        onChange={(e)=> dateChanged(e)}
        placeholder={observDate}
      />
      <br/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Раздел 1</Form.Label>
        <br/>
        <input
          type="text" name="section1"
          style={{ width: '380px', top: '60px',left: '10px'}}
          {...register("section1", { required: true })}
          onChange={e=>section1Changed(e)}
          placeholder="1sssK 2ddll 3RRRE 4sssK 5ddLL 6RRRE 7YYMM 8YYMM 9YYMM 0YYMM"
        />
      </Form.Group>
      <Button style={{marginTop: '10px'}} type="submit">Сохранить</Button> 
    </form>
    </main>
  )
}