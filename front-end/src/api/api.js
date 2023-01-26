import axios from 'axios'

export const api= axios.create({
    baseURL:'http://localhost:5000'
})

export const getRepositorios=async(idUser,query)=>{
    let url=`users/${idUser}/repositorys`
    
    if(query !== ''){
        query=query.substring(0,1).toUpperCase()+query.substring(1,query.lenght).toLowerCase()
        url+=`?q=${query}`
    }

    return api.get(url)
}

export const createRepositorys=async(idUser,name,userName)=>{
    let url=`users/${idUser}/repositorys`

    name=name.substring(0,1).toUpperCase()+name.substring(1,name.lenght).toLowerCase()

    return api.post(url,{name:name,url:`https://gitReact.com/${userName}/${name}`})
}

export const createUser=async(email,password,userName)=>{
    let url='users'
    return api.post(url,{email:email,password:password,userName:userName})
}

export const editUser=async(idUser,email,userName)=>{
    let url=`users/${idUser}`
    return api.put(url,{email:email,userName:userName})
}

export const editPassword=async(idUser,password,newPassword)=>{
    let url=`users/${idUser}`
    
    return api.patch(url,{password:password,newPassword:newPassword})
}

export const editRepository=async(idUser,idRepository,userName,name)=>{
    let url=`users/${idUser}/repositorys/${idRepository}`

    return api.put(url,{name:name,url:`https://gitReact.com/${userName}/${name}`})
}

export const deleteRepository=async(idUser,idRepository)=>{
    let url=`users/${idUser}/repositorys/${idRepository}`
    return api.delete(url)
}

export const deleteUser=async(idUser)=>{
    let url=`users/${idUser}`
    return api.delete(url)
}

export const createSession=async (email,password)=>{
    let url='/sessions'
    return api.post(url,{email,password})
}
