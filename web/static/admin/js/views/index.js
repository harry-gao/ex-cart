import AdminBaseView     from "./admin_base_view";
import AdminCountryView  from "./admin/countries";
import AdminOrderView    from "./admin/orders";
import AdminCartView     from "./admin/cart";
import AdminZoneView     from "./admin/zones";
import AdminCheckoutView from "./admin/checkout";
import AdminProductView  from "./admin/products";
import AdminOptionTypeView  from "./admin/option_types";

// add all the views here.
const views = {
  AdminCountryView,
  AdminOrderView,
  AdminCartView,
  AdminZoneView,
  AdminCheckoutView,
  AdminProductView,
  AdminOptionTypeView
};

export default function viewToRender(view) {
  let viewLookUp   = view.split(".");
  const actionName = viewLookUp.pop();
  const viewName   = viewLookUp.join("");
  let actionLookup = views[viewName];

  if (actionLookup) {
    return actionLookup(actionName);
  } else {
    if (viewLookUp[0] == 'Admin') {
      return AdminBaseView;
    } else {
      return BaseView;
    }
  }
}
