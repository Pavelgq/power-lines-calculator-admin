import { ClientDataInterface } from "../interfaces/client.interface"
import { apiInstance } from "./instance"

export const Client = {
  getAllClients: function ( token: string ) {
    const api = apiInstance({ token })

    return api.get('/user/all')
  },

  getOneClient: function ( token: string, id: number ) {
    const api = apiInstance({ token })

    return api.get(`/user/${id}`)
  },

  createClient: function ( token: string, clientData: ClientDataInterface ) {
  const api = apiInstance({ token });
  
    return api.post(`/user/create`, clientData);
  },

  editClient: function ( token: string, id: number, clientData: ClientDataInterface ) {
    const api = apiInstance({ token })

    return api.put(`/user/${id}`, )
  },

  deleteClient: function ( token: string, id: number ) {
    const api = apiInstance({ token })

    return api.delete(`/user/${id}`)
  },

}
