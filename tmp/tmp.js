


const to_binary = (x)=>{  
    return x.toString(2).split('').map(e=>Number(e))
}
const Fx = (x)=>{
    const bin = to_binary(x);
    const len = bin.length;
    const res = [];
    const current_row = [];
    for (let i=0; i<len; i++){
        current_row.push(bin[i]);
        if(bin[i]==0) continue;
        const r = [...current_row];
        for(let j=i+1; j<len; j++){
            r.push(0)
        }
        res.push(r)
    }
    return res;
}

assert.deepEqual(to_binary(1),[1]);
assert.deepEqual(to_binary(2),[1,0]);
assert.deepEqual(to_binary(5),[1,0,1]);
assert.deepEqual(Fx(1),[[1]]);
assert.deepEqual(Fx(5),[[1,0,0],[1,0,1]]);
assert.deepEqual(Fx(7),[[1,0,0],[1,1,0],[1,1,1]]);
assert.deepEqual(Fx(8),[[1,0,0,0]]);
assert.deepEqual(Fx(9),[[1,0,0,0],[1,0,0,1]]);
for (let i=1;i<20;i++){
    assert.deepEqual(Fx(i).pop(),to_binary(i));
}
