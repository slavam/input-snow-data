import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

let url = window.location.href || ''
export const apiSlice = createApi({                                                                                       
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.54.1.30:8640'}),
  tagTypes: ['Station','Precipitations'],
  endpoints: (builder) => ({                                                                                                
    saveSnowData: builder.query({                                                                                            
      query: snowData=>{                                                                                                       
        if(snowData){                                                                                                            
          // let url = window.location.href || ''
          // console.log(url)
          let ipAddress = ((url?.indexOf('localhost')>-1) || (url?.indexOf('//10.54.')>-1))? '10.54.1.11:8083':'31.133.32.14:8083'
          // console.log(ipAddress)
          // let ipAddress = 'localhost:3001'
          return `http://${ipAddress}/conservations/save_snow_data?mode=no-cors&telegram=${snowData['telegram']}&report_date=${snowData.reportDate}&source_code=${snowData.pointCode}`
        }
      },
    }),
    
    postPrecipitation: builder.query({
      query: pointName=>{
        let ipAddress = ((url?.indexOf('localhost')>-1) || (url?.indexOf('//10.54.')>-1))? '10.54.1.6:8080':'31.133.32.14:8080'
        return ({
          // url:  `http://10.54.1.6:8080/other_observations/post_precipitation.json?source=${pointName}`
          url:  `http://${ipAddress}/other_observations/post_precipitation.json?source=${pointName}`
        })}
      ,
      responseHandler: "text",
      providesTags: ['Precipitation'],
    }),
    
    savePrecipitation: builder.mutation({
      query: (precipitationData) =>{
        let ipAddress = ((url?.indexOf('localhost')>-1) || (url?.indexOf('//10.54.')>-1))? '10.54.1.6':'31.133.32.14'
        return({
          method: "POST",
          url: `http://${ipAddress}:8080/other_observations/create_other_data.json`,
          // headers: { "Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json' },
          body: precipitationData
      } )},
      invalidatesTags: ["Precipitation"]
    })
  })
})

export const {
  useSaveSnowDataQuery,
  useSavePrecipitationMutation,
  usePostPrecipitationQuery
} = apiSlice