$(function () {
    var usernameFld = $('#usernameFld');
    var passwordFld = $('#passwordFld');
    var firstNameFld = $('#firstNameFld');
    var lastNameFld = $('#lastNameFld');
    var roleFld = $('#roleFld');

    var userService = new AdminUserServiceClient()
    var editBtn = $(".wbdv-edit");
    var createBtn = $(".wbdv-create");
    var updateBtn = $(".wbdv-update");
    var searchBtn = $(".wbdv-search");
    var removeBtn = $(".wbdv-remove");
    var editBtn = $(".wbdv-edit");

    var users = [];
    var userList = $("#user-list");
    var rowTemplate = jQuery('.wbdv-template');
    var tbody = jQuery('tbody');

    var currentUserId = -1
    function editUser(index){
        currenttarget=$(index.currentTarget)
        userId = currenttarget.parent().parent().parent().find('.wbdv-id').html()
        currentUserId = userId
        userService.findUserById(userId)
            .then(user => {
                usernameFld.val(user.username)
                firstNameFld.val(user.firstname)
                lastNameFld.val(user.lastname)
                roleFld.val(user.role)
                renderUsers()
                })
        }

    const renderUsers = () =>{
    	tbody.empty()
    	for(var u in users){
    		const user = users[u]
    		const rowClone =rowTemplate.clone()
    		rowClone.removeClass('wbdv-hidden')
    		rowClone.find(".wbdv-id").html(user._id)
    		rowClone.find('.wbdv-username').html(user.username)
    		rowClone.find('.wbdv-password').html(user.password)
    		rowClone.find('.wbdv-first-name').html(user.firstname)
    		rowClone.find('.wbdv-last-name').html(user.lastname)
    		rowClone.find(".wbdv-role").html(user.role)
    		tbody.append(rowClone)
        }
        removeBtn = $(".wbdv-remove");
        removeBtn.click(deleteUser)
        //removeBtn.attr('id',user._id)
        editBtn = $(".wbdv-edit");
        editBtn.click(editUser)
        }
    userService.findAllUsers().then(renderUsers())

    function searchUser(){
    }

    function deleteUser (event){
    	currenttarget=$(event.currentTarget)
    	tr = currenttarget.parent().parent().parent()

    	userId=tr.find('.wbdv-id').html()
    	userService.deleteUser(userId)
                .then(response => {
                    findAllUsers()
                })
    }

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
        const Auser = {username:temp_username,password:temp_password,firstname:temp_firstname,lastname:temp_lastname,role:temp_role}
        userService.updateUser(currentUserId, Auser).then(newUser => {
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
        const rowTemplate = jQuery('.wbdv-hidden')
        const Auser = {
                username: temp_username,
                password: temp_password,
                firstname: temp_firstname,
                lastname: temp_lastname,
                role:temp_role
            }
        userService
        .createUser(Auser).then(newUser => {
            findAllUsers()
        })
        }
    createBtn.click(createUser)

    const findAllUsers = () =>
        userService.findAllUsers().then((theUsers) => {
            users = theUsers
            renderUsers()
            })
    findAllUsers()
    })