sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    "use strict";

    return {
        onCreateOrder: function (oEvent) {
            var oModel = this.getView().getModel();
            var oData = {
                "customerID": "eb1bd59-376f-4c05-a511-29c8b388fadb",
                "items": [
                    { "part": "550e8400-e29b-41d4-a716-446655440004", "quantity": 1 },
                    { "part": "550e8400-e29b-41d4-a716-446655440003", "quantity": 5 }
                ]
            };
            oModel.callFunction("/createOrder", {
                method: "POST",
                urlParameters: oData,
                success: function (oResponse) {
                    sap.m.MessageToast.show("Success!");
                },
                error: function (oError) {
                    sap.m.MessageBox.error("Error: " + oError.message);
                }
            });
        }
    };
});
