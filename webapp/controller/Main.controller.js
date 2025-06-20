sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("no.mil.ztravel.controller.Main", {
        onInit() {

            // For managed approuter (e.g. deployed in BTP), use:
            let appId = this.getOwnerComponent().getManifestEntry("/sap.app/id"),
                appPath = appId.replaceAll(".", "/"),
                appModulePath = jQuery.sap.getModulePath(appPath);

            // Local use
            let sUrl = "SAD-SSL/v1/marcopolo";

            var oModel = new sap.ui.model.json.JSONModel();
            debugger;
            jQuery.ajax({
                url: sUrl,
                method: "GET",
                contentType: "application/json",
                success: function (oData) {
                    oModel.setData(oData);
                    this.getView().setModel(oModel, "marcoPolo");
                }.bind(this),
                error: function (err) {
                    console.error("API call failed", err);
                }
            });
        }
    });
});