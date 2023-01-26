import { Router } from "express";
import RepositoryController from "./controllers/RepositoryController";
import SessionControllers from "./controllers/SessionControllers";
import UserControllers from './controllers/UserControllers'
import auth from "./middlewares/auth";

const route=new Router()


route.post('/sessions',SessionControllers.create)
route.post('/users',UserControllers.create)

route.use(auth)

route.get('/users',UserControllers.index)
route.get('/users/:id',UserControllers.show)
route.delete('/users/:id',UserControllers.destroy)
route.put('/users/:id',UserControllers.update)
route.patch('/users/:id',UserControllers.updatePassword)

route.get('/users/:idUser/repositorys',RepositoryController.index)
route.post('/users/:idUser/repositorys',RepositoryController.create)
route.delete('/users/:idUser/repositorys/:idRepository',RepositoryController.destroy)
route.put('/users/:idUser/repositorys/:idRepository',RepositoryController.update)

export default route