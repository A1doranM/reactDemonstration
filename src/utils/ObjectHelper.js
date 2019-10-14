
export const updateObjectInArray = (items, itemID, objPropName, newObjsProps) => {
    items.map(u => {
        if(u['id'] === itemID){
            return {
                ...u,
                ...newObjsProps
            }
        }
        return u;
    })
};