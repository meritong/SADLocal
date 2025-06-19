sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("no.mil.ztravel.controller.Main", {
        onInit() {


            var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
            var appPath = appId.replaceAll(".", "/");
            var appModulePath = jQuery.sap.getModulePath(appPath);

            // For managed approuter (e.g. deployed in BTP), use:
            var sUrl = appModulePath + "/destination/SAD";

            var oModel = new sap.ui.model.json.JSONModel();
            //var sUrl = "/"; // this goes through your destination
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