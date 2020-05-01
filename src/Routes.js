import React from 'react';
import './resources/css/app.css';
import './resources/css/bootstrap.min.css';
import { Switch } from "react-router-dom";
import Layout from './HOC/Layout'
import PrivateRoutes from './components/authRoutes/PrivateRoutes';
import PublicRoutes from './components/authRoutes/PublicRoutes';


import Home from './components/home'
import Gallery from './components/gallery';
import Sign_In from './components/signin';
import Services from './components/services';
import Accomodation from './components/accomodation';
import SingleAccomodation from './components/accomodation/SingleAccomodation';
import AdminMessages from './components/admin/messages/AdminMesaages';
import AdminGallery from './components/admin/gallery';
import AdminRooms from './components/admin/rooms';
import AddEditRooms from './components/admin/rooms/addEditRooms';
import AdminServices from './components/admin/services';
import AdminTariff from './components/admin/tariffs';
import Tariffs from './components/admin/tariffs/Tariffs'
import AdminAbout from './components/admin/about';
import NotFound from './components/ui/not_found';

import Dashboard from './components/admin/Dashboard';
import AddEditServices from './components/admin/services/addEditServices';

const Routes = (props) => {
  console.log(props)

  return (
    <Layout>
      <Switch>
        <PrivateRoutes {...props} path="/admin_services/add_service/:id" exact component={AddEditServices} />
        <PrivateRoutes {...props} path="/admin_services/add_service" exact component={AddEditServices} />
        <PrivateRoutes {...props} path="/admin_services" exact component={AdminServices} />
        <PrivateRoutes {...props} path="/admin_rooms/add_room" exact component={AddEditRooms} />
        <PrivateRoutes {...props} path="/admin_rooms/add_rooms/:id" exact component={AddEditRooms} />
        <PrivateRoutes {...props} path="/admin_rooms" exact component={AdminRooms} />
        <PrivateRoutes {...props} path="/tariffs/add_tariff/:id" exact component={AdminTariff} />
        <PrivateRoutes {...props} path="/tariffs/add_tariff" exact component={AdminTariff} />
        <PrivateRoutes {...props} path="/tariffs" exact component={Tariffs} />
        <PrivateRoutes {...props} path="/admin_gallery" exact component={AdminGallery} />
        <PrivateRoutes {...props} path="/admin_messages" exact component={AdminMessages}/>
        <PrivateRoutes {...props} path="/admin_about" exact component={AdminAbout}/>
        <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard}/>
        <PublicRoutes {...props} restricted={true} path="/sign_in" exact component={Sign_In} />
        <PublicRoutes {...props} restricted={false} path="/gallery" exact component={Gallery} />
        <PublicRoutes {...props} restricted={false} path="/accomodation/:id" exact component={SingleAccomodation} />
        <PublicRoutes {...props} restricted={false} path="/accomodation" exact component={Accomodation} />
        <PublicRoutes {...props} restricted={false} path="/services" exact component={Services} />
        <PublicRoutes {...props} restricted={false} path="/" exact component={Home} />
        <PublicRoutes {...props} restricted={false} component={NotFound} />

        
      </Switch>
    </Layout>
  );
}

export default Routes;
