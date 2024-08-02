document.addEventListener("DOMContentLoaded", function() {
    var { jsPDF } = window.jspdf;

    function addItem() {
        var newItem = document.getElementById("newItem").value;
        if (newItem) {
            var userChecklist = document.getElementById("userChecklist");
            var li = document.createElement("li");
            li.textContent = newItem;
            userChecklist.appendChild(li);
            document.getElementById("newItem").value = "";
        }
    }

    function downloadPDF() {
        var doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("College Application Checklist", 10, 10);

        doc.setFontSize(12);
        doc.text("Essential Tips for FGLI Students", 10, 20);
        var adviceItems = document.querySelectorAll(".advice ul li");
        adviceItems.forEach((item, index) => {
            doc.text((index + 1) + ". " + item.textContent, 10, 30 + index * 10);
        });

        doc.text("Example Checklist", 10, 30 + adviceItems.length * 10 + 10);
        var exampleItems = document.querySelectorAll("#exampleChecklist li");
        exampleItems.forEach((item, index) => {
            doc.text("- " + item.textContent, 10, 30 + adviceItems.length * 10 + 20 + index * 10);
        });

        doc.text("Your Checklist", 10, 30 + adviceItems.length * 10 + 20 + exampleItems.length * 10 + 10);
        var userItems = document.querySelectorAll("#userChecklist li");
        userItems.forEach((item, index) => {
            doc.text("- " + item.textContent, 10, 30 + adviceItems.length * 10 + 20 + exampleItems.length * 10 + 20 + index * 10);
        });

        doc.save("college-application-checklist.pdf");
    }

    window.addItem = addItem;
    window.downloadPDF = downloadPDF;
});
