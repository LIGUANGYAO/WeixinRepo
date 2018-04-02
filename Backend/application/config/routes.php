<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There area two reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router what URI segments to use if those provided
| in the URL cannot be matched to a valid route.
|
*/

$route['default_controller'] = "login_controller";
$route['404_override'] = 'error';
$route['dashboard'] = 'systemmanage/dashboard';

/*********** USER DEFINED ROUTES *******************/

$route['loginMe'] = 'login_controller/loginMe';

$route['Wxpay'] = 'Wxpay';
$route['Wxpay/confirm/(:any)'] = 'Wxpay/confirm/$1';
$route['Wxpay/pay_callback'] = 'Wxpay/pay_callback';

$route['logout'] = 'systemmanage/logout';
$route['roleListing'] = 'systemmanage/roleListing';
$route['userListing'] = 'systemmanage/userListing';
$route['userListing/(:num)'] = "systemmanage/userListing/$1";
$route['addNew'] = "systemmanage/addNewUser";

$route['usermanage'] = 'usermanage';
$route['usermanage/(:num)'] = 'usermanage';
$route['userCoListing/(:num)/(:any)/(:any)/(:any)/(:any)'] = 'usermanage/userCollectListing/$1/$2/$3/$4/$5';
$route['userListingByFilter'] = 'usermanage/userListingByFilter';
$route['changeForbidden/(:num)'] = 'usermanage/changeForbidden/$1';
$route['userDetail/(:num)'] = 'usermanage/showUserDetail/$1';

$route['event'] = 'eventmanage';
$route['eventmanage/(:num)'] = 'eventmanage'; 
$route['eventListingByFilter'] = 'eventmanage/eventListingByFilter';
$route['eventDetail/(:num)'] = 'eventmanage/showEventDetail/$1';

$route['booking'] = 'bookingmange';
$route['bookingmanage/(:num)'] = 'bookingmanage';
$route['bookingListingByFilter'] = 'bookingmanage/bookingListingByFilter';
$route['bookingDetail/(:num)'] = 'bookingmanage/showBookingDetail/$1';

$route['member'] = 'membermanage';
$route['member/(:num)'] = 'membermanage';
$route['memberListingByFilter'] = 'membermanage/memberListingByFilter';

$route['exchange'] = 'exchange';
$route['exchange/(:num)'] = 'exchange';
$route['exchangeListingByFilter'] = 'exchange/exchangeListingByFilter';
$route['exchangeDetail/(:num)'] = 'exchange/showExchangeDetail/$1';
$route['exchangeSend/(:num)'] = 'exchange/sendGood/$1';

$route['goods'] = 'goodsmanage';
$route['goods/(:num)'] = 'goodsmanage';
$route['goodsListingByFilter'] = 'goodsmanage/goodsListingByFilter';
$route['goodAdd'] = 'goodsmanage/goodAdd';

$route['binding'] = 'binding';
$route['binding/(:num)'] = 'binding';
$route['bindingListingByFilter'] = 'binding/bindingListingByFilter';
$route['bindingDetail/(:num)'] = 'binding/showBindingDetail/$1';
$route['bindingConfirm/(:num)'] = 'binding/bindingShowConfirm/$1';
$route['bindingConfirmed'] = 'binding/bindingConfirmed';

$route['rating'] = "rating";
$route['rating/(:num)'] = 'rating';
$route['ratingListingByFilter'] = 'rating/ratingListingByFilter';

$route['alarm'] = "alarm";

$route['editOld'] = "systemmanage/editOld";
$route['editOld/(:num)'] = "systemmanage/editOld/$1";
$route['editUser'] = "systemmanage/editUser";
$route['deleteUser/(:num)'] = "systemmanage/deleteUser/$1";
$route['deleteRole/(:num)'] = "systemmanage/deleteRole/$1";
$route['loadChangePass'] = "systemmanage/loadChangePass";
$route['changePassword'] = "systemmanage/changePassword";
$route['updateUserPassword'] = "systemmanage/updateUserPassword";
$route['pageNotFound'] = "systemmanage/pageNotFound";
$route['checkEmailExists'] = "systemmanage/checkEmailExists";

$route['forgotPassword'] = "login_controller/forgotPassword";
$route['resetPasswordUser'] = "login_controller/resetPasswordUser";
$route['resetPasswordConfirmUser'] = "login_controller/resetPasswordConfirmUser";
$route['resetPasswordConfirmUser/(:any)'] = "login_controller/resetPasswordConfirmUser/$1";
$route['resetPasswordConfirmUser/(:any)/(:any)'] = "login_controller/resetPasswordConfirmUser/$1/$2";
$route['createPasswordUser'] = "login_controller/createPasswordUser";
/*-----------------------API-------------------------*/
$route['api/addNewUser'] = "api/Data_Manage/addNewUser";
$route['api/getUserState'] = "api/Data_Manage/getState";
$route['api/getUserDetail'] = "api/Data_Manage/getUserDetail";

$route['api/getMyBooking'] = "api/Data_Manage/getMyBooking";
$route['api/getBookingDetail'] = "api/Data_Manage/getBookingDetail";
$route['api/cancelBooking'] = "api/Data_Manage/cancelBooking";
$route['api/addRating'] = "api/Data_Manage/addRating";
$route['api/getAllEvents'] = "api/Data_Manage/getEventByUser";
$route['api/getEventDetail'] = "api/Data_Manage/getEventDetail";
$route['api/getBookingDetailByEvent'] = "api/Data_Manage/getBookingDetailByEvent";
$route['api/cancelEvent'] = "api/Data_Manage/cancelEvent";
$route['api/getEventsByProvince'] = "api/Data_Manage/getEventByProvince";

$route['api/getMemberState'] = "api/Data_Manage/getMemberState";
$route['api/setMember'] = "api/Data_Manage/setMember";

$route['api/getFavouriteSite'] = "api/Data_Manage/getFavouriteSite";
$route['api/getSiteDetail'] = "api/Data_Manage/getSiteDetail";
$route['api/cancelFavouriteSite'] = "api/Data_Manage/cancelFavouriteSite";

$route['api/getRatingCountBySite'] = "api/Data_Manage/getRatingCountBySite";
$route['api/getRatingBySite'] = "api/Data_Manage/getRatingBySite";
$route['api/getRatingByEvent'] = "api/Data_Manage/getRatingByEvent";

$route['api/registerUser'] = "api/Data_Manage/registerUser";
$route['api/registerBoss'] = "api/Data_Manage/registerBoss";
$route['api/addAllowPic'] = "api/Data_Manage/addAllowPic";
$route['api/addIDPic1'] = "api/Data_Manage/addIDPic1";
$route['api/addIDPic2'] = "api/Data_Manage/addIDPic2";

$route['api/addAcceptAddress'] = "api/Data_Manage/addAcceptAddress";
$route['api/getAcceptAddress'] = "api/Data_Manage/getAcceptAddress";
$route['api/changeAcceptAddress'] = "api/Data_Manage/changeAcceptAddress";
$route['api/checkAcceptAddress'] = "api/Data_Manage/checkAcceptAddress";
$route['api/deleteAcceptAddress'] = "api/Data_Manage/deleteAcceptAddress";

$route['api/getSiteStatus'] = "api/Data_Manage/getSiteStatus";
$route['api/addSiteInfo'] = "api/Data_Manage/addSiteInfo";
$route['api/addSitePicture'] = "api/Data_Manage/addSitePicture";
$route['api/editSiteInfo'] = "api/Data_Manage/editSiteInfo";
$route['api/editSiteInfo1'] = "api/Data_Manage/editSiteInfo1";
$route['api/addSitePictureURL'] = "api/Data_Manage/addSitePictureURL";

$route['api/getBindingInfo'] = "api/Data_Manage/getBinding";
$route['api/addBindingInfo'] = "api/Data_Manage/addBinding";
$route['api/getPaymentHistory'] = "api/Data_Manage/getPaymentHistory";
$route['api/addBindingHistory'] = "api/Data_Manage/addBindingHistory";

$route['api/pay'] = "api/Data_Manage/pay";
$route['api/notify'] = "api/Data_Manage/notify";

$route['api/getProvinces'] = "api/Data_Manage/getProvinces";
$route['api/getCities'] = "api/Data_Manage/getCities";
$route['api/getAreas'] = "api/Data_Manage/getAreas";

$route['api/getGoodsList'] = "api/Data_Manage/getGoodsList";
$route['api/getGoodDetail'] = "api/Data_Manage/getGoodDetail";
$route['api/orderExchange'] = "api/Data_Manage/orderExchange";
$route['api/setExchange'] = "api/Data_Manage/setExchange";
$route['api/getExchange'] = "api/Data_Manage/getExchange";
$route['api/getExchangeDetail'] = "api/Data_Manage/getExchangeDetail";

$route['api/getItemsOnMap'] = "api/Data_Manage/getItemsOnMap";
$route['api/catchHoney'] = "api/Data_Manage/catchHoney";

$route['api/createEvent'] = "api/Data_Manage/addEvent";
/* End of file routes.php */
/* Location: ./application/config/routes.php */