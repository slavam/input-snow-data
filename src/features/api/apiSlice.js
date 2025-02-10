import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({                                                                                       
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.54.1.30:8640'}),
  tagTypes: ['Station'],
  endpoints: (builder) => ({                                                                                                
    saveSnowData: builder.query({                                                                                            
      query: snowData=>{                                                                                                       
        if(snowData){                                                                                                            
          let url = window.location.href || ''
          console.log(url)
          let ipAddress = ((url?.indexOf('localhost')>-1) || (url?.indexOf('//10.54.')>-1))? '10.54.1.11:8083':'31.133.32.14:8083'
          console.log(ipAddress)
          return `http://${ipAddress}/conservations/save_snow_data?mode=no-cors&telegram=${snowData['telegram']}&report_date=${snowData.reportDate}&source_code=${snowData.pointCode}`
        }
      },
    }),
  })
})

export const {
  useSaveSnowDataQuery} = apiSlice