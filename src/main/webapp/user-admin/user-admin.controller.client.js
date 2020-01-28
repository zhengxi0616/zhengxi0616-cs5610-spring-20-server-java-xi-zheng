$(function () {

    function main() {
        rowTemplate = $('.wbdv-template');
        tbody = $('tbody');
        editBtn = $(".wbdv-edit");
        createBtn = $(".wbdv-create");
        updateBtn = $(".wbdv-update");
        searchBtn = $(".wbdv-search");
        removeBtn = $(".wbdv-remove");
        editBtn = $(".wbdv-edit");
        usernameFld = $('#usernameFld');
        passwordFld = $('#passwordFld');
        firstNameFld = $('#firstNameFld');
        lastNameFld = $('#lastNameFld');
        roleFld = $('#roleFld');
        }
    $(main());

    var userService = new AdminUserServiceClient();
    var users = [];
    //var userList = $("#user-list");

    function renderUser(User,RowClone) {
        RowClone.removeClass('wbdv-hidden')
        RowClone.find("#unique-id").html(User._id)
        RowClone.find('.wbdv-username').html(User.username)
        RowClone.find('.wbdv-password').html("")
        RowClone.find('.wbdv-first-name').html(User.firstname)
        RowClone.find('.wbdv-last-name').html(User.lastname)
        RowClone.find(".wbdv-role").html(User.role)
    	}

    function renderUsers() {
    	tbody.empty()
    	for (let u = 0; u < users.length; u++) {
    		var user = users[u]
    		var rowClone =rowTemplate.clone()
    		renderUser(user,rowClone)
    		tbody.append(rowClone)
        }
        removeBtn = $(".wbdv-remove")
        removeBtn.click(deleteUser)
        editBtn = $(".wbdv-edit")
        editBtn.click(editUser)
        }
    userService.findAllUsers().then(renderUsers())

    var currentUserId = -1
    function editUser(event){
        currentTarget=$(event.currentTarget)
        userId = currentTarget.parent().parent().parent().find('#unique-id').html()
        currentUserId = userId
        findUserById(userId)
        }
    editBtn.click(editUser)

    function searchUser(){
    }

    function deleteUser (event){
    	currentTarget=$(event.currentTarget)
    	userId = currentTarget.parent().parent().parent().find('#unique-id').html()
    	userService.deleteUser(userId).then(newewUser => {
            findAllUsers()
            })
    }
    removeBtn.click(deleteUser)

    function updateUser() {
        const temp_username = usernameFld.val()
        usernameFld.val("")
        const temp_password = passwordFld.val()
        passwordFld.val("")
        const temp_firstname = firstNameFld.val()
        firstNameFld.val("")
        const temp_lastname = lastNameFld.val()
        lastNameFld.val("")
        const temp_role = roleFld.val()
        const userinfo = {username:temp_username,password:temp_password,firstname:temp_firstname,lastname:temp_lastname,role:temp_role}
        userService.updateUser(currentUserId, userinfo).then(newUser => {
                findAllUsers()
                })
        }
    updateBtn.click(updateUser);

    function createUser(){
        const temp_username = usernameFld.val()
        usernameFld.val("")
        const temp_password = passwordFld.val()
        passwordFld.val("")
        const temp_firstname = firstNameFld.val()
        firstNameFld.val("")
        const temp_lastname = lastNameFld.val()
        lastNameFld.val("")
        const temp_role = roleFld.val()
        var userinfo = {username: temp_username,password: temp_password,firstname: temp_firstname,lastname: temp_lastname,role:temp_role}
        userService.createUser(userinfo).then(newUser => {
            findAllUsers()
            })
        }
    createBtn.click(createUser)

    function findAllUsers() {
        userService.findAllUsers().then((theUsers) => {
            users = theUsers
            renderUsers()
            })
            }
    findAllUsers()

    function findUserById(knowingid){
        userService.findUserById(knowingid)
            .then(user => {
                usernameFld.val(user.username)
                passwordFld.val(user.password)
                firstNameFld.val(user.firstname)
                lastNameFld.val(user.lastname)
                roleFld.val(user.role)
                renderUsers()
                })
    	}
    });