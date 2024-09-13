const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				fetch('https://playground.4geeks.com/contact/agendas/josedu')
				.then(response => {
					if (!response.ok) {
						throw new Error("Error al obtener los datos");
					}
					return response.json();
				})
 				.then(data => {
					console.log(data);
					setStore({data:data});
				});
			},
			postSomeData: async (data) => {
				let url = "https://playground.4geeks.com/contact/agendas/josedu/contacts";
				try {
					const res = await fetch(url, {
						method: "POST",
						body: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json",
						},
					});
					if (!res.ok) throw new Error("Error al crear el contacto");
			
					console.log("Contacto creado con éxito");
					await getActions().loadSomeData();  // Cargar los datos después de la creación
				} catch (error) {
					console.error("Error al crear el contacto:", error);
				}
			},
			deleteSomeData: async (id) => {
				console.log("Eliminando el contacto con ID:", id);
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/josedu/contacts/${id}`, {
						method: "DELETE",
					});
			
					if (!response.ok) {
						throw new Error("Error al eliminar el contacto");
					}
			
					console.log(`Contacto ${id} eliminado con éxito`);
					await getActions().loadSomeData();  //Deberia cargar los datos despues de eliminar D:
				} catch (error) {
					console.error("Error al eliminar:", error);
				}
			},
			
			editSomeData: async (id, updateData) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/josedu/contacts/${id}`, {
						method: "PUT",
						body: JSON.stringify(updateData),
						headers: {
							"Content-Type": "application/json",
						},
					});
					if (!response.ok) {
						const errorMsg = await response.json();
						throw new Error(errorMsg.message || "Error al actualizar el contacto");
					}
					console.log("Contacto actualizado con éxito");
					await getActions().loadSomeData();  
				} catch (error) {
					console.error("Error al actualizar el contacto:", error);
				}
			},
			
			
			
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
