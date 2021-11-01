function refIdToArray(refId){
    return [Number(refId.charAt(3)),Number(refId.charAt(4))]
}

export {refIdToArray}