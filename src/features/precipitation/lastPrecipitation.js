import { usePostPrecipitationQuery } from "../api/apiSlice"

export const LastPrecipitation = ({pointName})=> {
  const {                                                                                                                                                                                                            
    data: response = {},                                                                                                                                                                                             
    isSuccess,
  } = usePostPrecipitationQuery(pointName)
  
  const percRow = isSuccess? response.precipitation.map((p) => {
    let observed = `${p.obs_date}/${p.period==='day'? 'Д':'Н'} ${p.value} ${p.description}`
    return(
      <p key={p.id}>{observed}</p>
    )
  }):[]
  return(
    <div>
      <h3>Последние данные</h3>
      <p><b>Дата | значение (мм) | описание</b></p>
      {percRow}
    </div>
  )
}