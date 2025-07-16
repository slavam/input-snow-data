import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useSavePrecipitationMutation } from '../api/apiSlice'
import { LastPrecipitation } from './lastPrecipitation';

let showResponse = false
const today = new Date()
export const InputPrecipitation = ({pointName})=> {
  // const navigate = useNavigate()
  // navigate('/precipitationList', { state: { pointName } })
  // useEffect(() => {
  //     navigate('/precipitationList', {replace: true, state: {pointName}})
  // }, [showResponse])
  // console.log(pointName)
  let pData = {}
  const [observDate, setObservDate] = useState(today.toISOString().slice(0,10))
  const [mmValue, setMmValue] = useState('0.0')
  const [isDay, setIsDay] = useState(true)
  const [description, setDescription] = useState('')

  const [
    savePrecipitation, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useSavePrecipitationMutation()

  const descriptionChanged = e=>{
    setDescription(e.target.value)
  }
  const dateChanged = e=>{
    setObservDate(e.target.value)
  }
  const valueChanged = e=>{
    setMmValue(e.target.value)
  }
  const radioChanged = e=>{
    setIsDay(e.target.id === 'day'? true:false)
  }

  const onSubmit = async () => {
    if(+mmValue>=0.){
      pData = {
        data_type: 'perc',
        value: mmValue,
        obs_date: observDate,
        source: pointName,
        description,
        period: isDay? 'day':'night'
      }
      await savePrecipitation(pData).unwrap()
      showResponse = true
    }else{
      alert('Error!')
    }
  }
  const { register, handleSubmit, formState, // reset, 
    formState: { isSubmitSuccessful }} = useForm({
    defaultValues: {
      observDate,
    },
  })

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setObservDate(today.toISOString().slice(0,10))
      setMmValue('0.0')
      setIsDay(true)
      setDescription('')
      // reset({ observDate: today.toISOString().slice(0,10) })
      // navigate('/precipitationList', {replace: true, state: {pointName}})
    }
  }, [formState])
  if(showResponse){ // && isSuccess && response.response){
    showResponse = false
    alert("Сохранены данные")
  }
  return (
    <main style={{padding: '10px', backgroundColor: '#ccc'}} >
      <p><b>Осадки {pointName}</b></p>
      <form onSubmit={handleSubmit(onSubmit)} >
        <Form.Group className="mb-3">
          <Form.Label className="ml-10">Дата наблюдения</Form.Label>
          <br/>      
          <input
            type="date" name="observDate" id="inpit-date"
            {...register("observDate", { required: true })}
            onChange={(e)=> dateChanged(e)}
            placeholder={observDate}
          />
          <br/>
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label className="ml-10">День/ночь</Form.Label>
          <Form.Check
            name="group1"
              checked={isDay}
              type='radio'
              id='day'
              label="День"
              onChange={e=>radioChanged(e)}
            />
          <Form.Check
            name="group1"
              type='radio'
              id='night'
              label="Ночь"
              onChange={e=>radioChanged(e)}
            />
        </Form.Group>
        <Form.Label>Описание осадков</Form.Label>
        <Form.Control id="description" type="text" value={description} onChange={e=>descriptionChanged(e)} />
        <Form.Label>Количество осадков (мм)</Form.Label>
        <Form.Control id="value" type="number" value={mmValue} onChange={e=>valueChanged(e)} min='0.0' max='999.9' step='0.1'/>
        <Button style={{marginTop: '10px'}} type="submit">Сохранить</Button> 
      </form>
      <LastPrecipitation pointName={pointName}/>
    </main>
  )
}