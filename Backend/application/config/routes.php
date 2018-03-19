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

/*********** USER DEFINED ROUTES *******************/

$route['loginMe'] = 'login_controller/loginMe';

$route['Wxpay'] = 'Wxpay';
$route['Wxpay/confirm/(:any)'] = 'Wxpay/confirm/$1';
$route['Wxpay/pay_callback'] = 'Wxpay/pay_callback';

$route['logout'] = 'systemmanage/logout';
$route['roleListing'] = 'systemmanage/roleListing';
$route['userListing'] = 'systemmanage/userListing';
$route['userListing/(:num)'] = "systemmanage/userListing/$1";
$route['addNew'] = "systemmanage/addNew";

$route['usermanage'] = 'usermanage';
$route['usermanage/(:num)'] = 'usermanage';
$route['userCoListing/(:num)/(:any)/(:any)/(:any)/(:any)'] = 'usermanage/userCollectListing/$1/$2/$3/$4/$5';
$route['userListingByFilter'] = 'usermanage/userListingByFilter';
$route['changeForbidden/(:num)'] = 'usermanage/changeForbidden/$1';
$route['userDetail/(:num)'] = 'usermanage/showUserDetail/$1';
$route['addNewUser'] = "usermanage/addNewUser";

$route['event'] = 'eventmanage';
$route['event/(:num)'] = 'eventmanage'; 
$route['eventListingByFilter'] = 'eventmanage/eventListingByFilter';
$route['eventDetail/(:num)'] = 'eventmanage/showEventDetail/$1';

$route['booking'] = 'bookingmange';
$route['booking/(:num)'] = 'bookingmanage';
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

$route['binding'] = 'binding';
$route['binding/(:num)'] = 'binding';
$route['bindingListingByFilter'] = 'binding/bindingListingByFilter';
$route['bindingDetail/(:num)'] = 'binding/showBindingDetail/$1';
$route['bindingConfirm/(:num)'] = 'binding/bindingShowConfirm/$1';
$route['bindingConfirmed'] = 'binding/bindingConfirmed';

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
$route['api/addNewUser'] = "api/User_Manage/addNewUser";
$route['api/getUserState'] = "api/User_Manage/getState";
$route['api/getMyBooking'] = "api/User_Manage/getMyBooking";
$route['api/getBookingDetail'] = "api/User_Manage/getBookingDetail";
$route['api/cancelBooking'] = "api/User_Manage/cancelBooking";
$route['api/addRating'] = "api/User_Manage/addRating";

/* End of file routes.php */
/* Location: ./application/config/routes.php */