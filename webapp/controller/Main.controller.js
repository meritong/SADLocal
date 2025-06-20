sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("no.mil.ztravel.controller.Main", {
        onInit() {

            this.byId("butRefresh").firePress();
        },
        
        onPressRefresh:function(){
            // For managed approuter (e.g. deployed in BTP), use:
            let appId = this.getOwnerComponent().getManifestEntry("/sap.app/id"),
                appPath = appId.replaceAll(".", "/"),
                appModulePath = jQuery.sap.getModulePath(appPath);

            // Local use
            let sUrl = "SAD-SSL/v1/marcopolo";

            this.byId("textUpdate").setBusy(true);
            jQuery.ajax({
                url: sUrl,
                method: "GET",
                contentType: "application/json",
                success: function (oData) {                

                    this.getView().setModel(new sap.ui.model.json.JSONModel(oData), "marcoPolo");
                    this.byId("textUpdate").setBusy(false);
                }.bind(this),
                error: function (err) {
                    console.error("API call failed", err);
                    this.byId("textUpdate").setBusy(false);
                }.bind(this)
            });
        },

        onValueHelpRequest:function(){        
            new MessageBox.alert("Avventer til ny tjeneste")
        }
    });
});