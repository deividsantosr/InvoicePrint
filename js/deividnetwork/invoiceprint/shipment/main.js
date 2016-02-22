function InvoiceprintShipment(select) {
    'use-strict';

    this.element = select;

    this.init();
}

InvoiceprintShipment.prototype.init = function () {
    this.createButton();
    this.toPrint();
};

InvoiceprintShipment.prototype.toPrint = function () {
    var self = this;

    jQuery('#printorder').click(function (e) {
        if (self.checked()) {
            window.open('http://' + location.hostname + '/invoiceprint/index/invoice/id/' + self.getId(), '_blank');
        }
        else {
            e.preventDefault();

            window.alert('Selecione um pedido!');
        }
    });
};

InvoiceprintShipment.prototype.getId = function () {
    var self = this;
    var id = '';

    jQuery(self.element).each(function () {
        var last = jQuery(self.element).last();

        if (jQuery(this).val() == last.val()) {
            id += jQuery(this).parents('tr').find('td:eq(3)').text().replace(/\s/g, '');
        }
        else {
            id += jQuery(this).parents('tr').find('td:eq(3)').text().replace(/\s/g, '') + '-';
        }
    });

    return id;
};

InvoiceprintShipment.prototype.checked = function () {
    if (this.getId() != undefined && this.getId() != '') {
        return true;
    }
    else {
        return false;
    }
};

InvoiceprintShipment.prototype.createButton = function () {
    jQuery('.filter-actions.a-right').append('<button id="printorder" type="submit" class="scalable task"><span>Imprimir</span></button>');
};

setTimeout(function () {
    new InvoiceprintShipment('#sales_shipment_grid_table tbody td input[name="shipment_ids"]:checked');
}, 100);