

window.onload = function() {
    getUser();
};


function getUser() {
    var req = new XMLHttpRequest();
    req.onload = function() {
        if (req.readyState === 4) {
            if (req.status === 200) {
                var user = JSON.parse(req.responseText);

                var nameLabel = document.getElementById("name_label");

                nameLabel.innerHTML += user.firstName + " " + user.lastName;

                var dsidLabel = document.getElementById("dsid_label");

                dsidLabel.innerHTML += user.prsId;
            } else {
                alert("Get user error: " + req.statusText);
            }
        }
    };
    req.open("GET", "/user", true);
    req.send();
}
