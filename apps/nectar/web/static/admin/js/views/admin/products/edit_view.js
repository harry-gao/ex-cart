import BaseProductView from "./base_product_view";

export default class EditView extends BaseProductView {
  mount() {
    super.mount();
    this.initTinymce();
    this.handleAdd();
    this.handleDelete();
  }

  unmount() {
    super.unmount();
  }

  initTinymce() {
    tinymce.init({
      selector: '#product-description',
      plugins: "textcolor image", 
      toolbar: "forecolor backcolor",
      images_upload_url: '/documents/upload_image',
      textcolor_map: [
        "000000", "Black",
        "993300", "Burnt orange",
        "333300", "Dark olive",
        "003300", "Dark green",
        "003366", "Dark azure",
        "000080", "Navy Blue",
        "333399", "Indigo",
        "333333", "Very dark gray",
        "800000", "Maroon",
        "FF6600", "Orange",
        "808000", "Olive",
        "008000", "Green",
        "008080", "Teal",
        "0000FF", "Blue",
        "666699", "Grayish blue",
        "808080", "Gray",
        "FF0000", "Red",
        "FF9900", "Amber",
        "99CC00", "Yellow green",
        "339966", "Sea green",
        "33CCCC", "Turquoise",
        "3366FF", "Royal blue",
        "800080", "Purple",
        "999999", "Medium gray",
        "FF00FF", "Magenta",
        "FFCC00", "Gold",
        "FFFF00", "Yellow",
        "00FF00", "Lime",
        "00FFFF", "Aqua",
        "00CCFF", "Sky blue",
        "993366", "Red violet",
        "FFFFFF", "White",
        "FF99CC", "Pink",
        "FFCC99", "Peach",
        "FFFF99", "Light yellow",
        "CCFFCC", "Pale green",
        "CCFFFF", "Pale cyan",
        "99CCFF", "Light sky blue",
        "CC99FF", "Plum"
      ]
    });
  }
  handleAdd() {
    $(document).on("click", "#add_option_value, #add_product_option_type, #add_category, #add_product_category, #add_product_image", function(e) {
      e.preventDefault();
      let time = new Date().getTime();
      let template = $(this).data("template");
      var uniq_template = template.replace(/\[0\]/g, `[${time}]`);
      uniq_template = uniq_template.replace(/_0_/g, `_${time}_`);
      $(this).after(uniq_template);
    });
  }

  handleDelete() {
    $(document).on("click", "#delete_option_value, #delete_product_option_type, #delete_category, #delete_product_category, #delete_product_image", function(e) {
      e.preventDefault();
      $(this).parent().remove();
    });
  }
}
