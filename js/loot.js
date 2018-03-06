$(document).ready(function () {
    let data;
    function fetchLoot() {
        let self = this;
        self.isLoading = ko.observable(false);
        self.isLoading(true);            
        $.getJSON("https://immense-caverns-32156.herokuapp.com/lootevents", function(data) {
            self.tableData = ko.observableArray(formatted(data));
            ko.applyBindings(self.tableData);
            $('#loot-table').DataTable();
            self.isLoading(false);
        });
    }
    fetchLoot();
});

function formatted(data) {
    let formattedData = data.map((lootevent) => {
        return {
            player: getLeftPart(lootevent.player),
            url: formatLink(lootevent.player),
            item: lootevent.item,
            itemUrl: formatItemLink(lootevent.itemId),
            response: lootevent.response,
            date: lootevent.date
        }
    });
    return formattedData;
}

function formatLink(nameRealm) {
    let name = nameRealm.substring(0, nameRealm.indexOf('-'));
    let realm = nameRealm.substring( nameRealm.indexOf('-') + 1 );
    return `https://worldofwarcraft.com/en-gb/character/${realm}/${name}`;
}

function getLeftPart(str) {
    return str.substring(0, str.indexOf('-'));
}

function getRightPart(str) {
    return str.substring( str.indexOf('-') + 1 );
}

function formatItemLink(itemId) {
    return `http://www.wowhead.com/item=${itemId}`
}
