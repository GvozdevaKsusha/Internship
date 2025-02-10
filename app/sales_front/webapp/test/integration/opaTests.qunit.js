sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'salesfront/test/integration/FirstJourney',
		'salesfront/test/integration/pages/PartsList',
		'salesfront/test/integration/pages/PartsObjectPage'
    ],
    function(JourneyRunner, opaJourney, PartsList, PartsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('salesfront') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePartsList: PartsList,
					onThePartsObjectPage: PartsObjectPage
                }
            },
            opaJourney.run
        );
    }
);