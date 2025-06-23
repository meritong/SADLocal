sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("no.mil.ztravel.controller.Main", {
        onInit() {

            this.byId("butRefresh").firePress();
        },

        onPressRefresh: function () {
            // For managed approuter (e.g. deployed in BTP), use:
            let appId = this.getOwnerComponent().getManifestEntry("/sap.app/id"),
                appPath = appId.replaceAll(".", "/"),
                appModulePath = jQuery.sap.getModulePath(appPath);

            // Local use
            let sUrl = "SAD-SSL/v1/marcopolo";

            const ReiseSkjema = [
                { key: "01", text: "Reise innland" },
                { key: "0b", text: "Dagsreiser" }
            ];

            const ReiseTyper = [
                { key: "B", text: "Dagsreise", scheema: "0b" },
                { key: "A", text: "Hotel", scheema: "01" },
                { key: "E", text: "Pensjonat", scheema: "01" },
                { key: "H", text: "Hybel", scheema: "01" }
            ];

            const query = `?ReiseSkjema=${encodeURIComponent(JSON.stringify(ReiseSkjema))}&ReiseTyper=${encodeURIComponent(JSON.stringify(ReiseTyper))}`;

            sUrl = sUrl + query;




            this.byId("textUpdate").setBusy(true);
            jQuery.ajax({
                url: sUrl,
                method: "GET",
                contentType: "application/json",
                success: function (oData) {

                    let data = {};

                    // Parse ReiseSkjema and ReiseTyper from string to array
                    data.reiseSkjema = JSON.parse(oData.ReiseSkjema);
                    data.reiseTyper = JSON.parse(oData.ReiseTyper);
                    data.backend_timestamp = oData["backend-timestamp"];

                    this.getView().setModel(new sap.ui.model.json.JSONModel(data), "marcoPolo");
                    this.byId("textUpdate").setBusy(false);
                }.bind(this),
                error: function (err) {
                    console.error("API call failed", err);
                    this.byId("textUpdate").setBusy(false);
                }.bind(this)
            });
        },

        onValueHelpRequest: function () {
            new MessageBox.alert("Avventer til ny tjeneste")
        },

        onChangeSkjema: function () {
            const oInitModel = this.getOwnerComponent().getModel("initModel"),
                sSkjema = oInitModel.getProperty("/skjema");
            const oSelect = this.byId("selReiseType");
            const oBinding = oSelect.getBinding("items");

            const oFilter = new sap.ui.model.Filter("scheema", sap.ui.model.FilterOperator.EQ, sSkjema);
            oBinding.filter([oFilter]);
        }
    });
});