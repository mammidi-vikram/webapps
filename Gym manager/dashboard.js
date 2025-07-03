function addMember() {
  const db = firebase.database();
  const id = "mem_" + Date.now();
  const member = {
    id,
    name: prompt("Name:"),
    package: prompt("Package:"),
    dueDate: prompt("Due Date:")
  };

  db.ref("members/" + id).set(member)
    .then(() => alert("Member added"))
    .catch(err => console.error(err));
}
